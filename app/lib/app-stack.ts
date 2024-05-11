import {
  Stack,
  StackProps,
  aws_s3 as s3,
  aws_iam as iam,
  aws_codecommit as codecommit,
  aws_codebuild as codebuild,
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as codepipelineActions,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3 Bucket for Artifacts
    const artifactBucket = new s3.Bucket(this, 'ArtifactBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    // Bucket Policy to deny unencrypted uploads
    const denyUnencryptedUploadsPolicy = new iam.PolicyStatement({
      actions: ['s3:PutObject'],
      resources: [artifactBucket.bucketArn + '/*'],
      principals: [new iam.AnyPrincipal()],
      effect: iam.Effect.DENY,
      conditions: {
        StringNotEquals: {
          's3:x-amz-server-side-encryption': 'aws:kms',
        },
      },
    });
    artifactBucket.addToResourcePolicy(denyUnencryptedUploadsPolicy);

    // CodeCommit Repository
    const repository = new codecommit.Repository(
      this,
      'JavaProjectRepository',
      {
        repositoryName: 'java-project',
      }
    );

    // IAM Role for CodeBuild
    const buildRole = new iam.Role(this, 'AppBuildRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
    });

    buildRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          's3:GetObject',
          's3:PutObject',
          's3:GetBucketAcl',
          's3:GetBucketLocation',
        ],
        resources: [artifactBucket.bucketArn, artifactBucket.bucketArn + '/*'],
      })
    );

    buildRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['codecommit:GitPull'],
        resources: [repository.repositoryArn],
      })
    );

    // CodeBuild Project
    const buildProject = new codebuild.Project(this, 'AppBuildProject', {
      source: codebuild.Source.codeCommit({ repository }),
      artifacts: codebuild.Artifacts.s3({
        bucket: artifactBucket,
        includeBuildId: false,
        packageZip: true,
        path: '/',
        name: 'artifact.zip',
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        computeType: codebuild.ComputeType.SMALL,
      },
      role: buildRole,
    });

    // IAM Role for CodePipeline
    const pipelineRole = new iam.Role(this, 'CodePipelineServiceRole', {
      assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com'),
    });

    // CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'JavaProjectPipeline', {
      pipelineName: 'JavaProjectPipeline',
      role: pipelineRole,
      artifactBucket: artifactBucket,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipelineActions.CodeCommitSourceAction({
              actionName: 'CodeCommit_Source',
              repository,
              output: new codepipeline.Artifact('SrcOutput'),
              branch: 'master',
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipelineActions.CodeBuildAction({
              actionName: 'CodeBuild_Build',
              project: buildProject,
              input: new codepipeline.Artifact('SrcOutput'),
              outputs: [new codepipeline.Artifact('BuildOutput')],
            }),
          ],
        },
      ],
    });
  }
}
