# AWS CDK Software Delivery Pipeline

This repository contains the AWS Cloud Development Kit (CDK) code to set up a comprehensive software delivery pipeline. This pipeline automates the process from code commit to deployment, utilizing several AWS services including CodeCommit, CodeBuild, CodeDeploy, and CodePipeline.

## Prerequisites

Before you begin, ensure you have the following:

- An AWS account
- AWS CLI installed and configured with appropriate credentials
- Node.js and npm installed
- AWS CDK installed

## Setup

To set up your CDK pipeline, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://your-repository-url.git
cd your-repository-directory
```

### 2. Install Dependencies

Navigate to the cloned directory and install the required npm packages:

```bash
npm install
```

### 3. Deploy the CDK Stack

Deploy the CDK stack to your AWS account:

```bash
cdk deploy
```

## Usage

Once deployed, the pipeline will automatically handle the deployment of your applications based on the configurations defined within the CDK scripts.

- **CodeCommit**: Push your application code here.
- **CodeBuild**: Automatically builds and tests your code every time there's a commit.
- **CodeDeploy**: Deploys the built code to your specified environments.
- **CodePipeline**: Manages the workflow of pulling from CodeCommit, building with CodeBuild, and deploying with CodeDeploy.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## Pipeline Structure

The pipeline is structured to follow best practices of CI/CD, ensuring that your application is always in a deployable state, your build artifacts are intact, and your deployments are automated.

## Contributing

Contributions are welcome! Please read the contributing guide to learn how you can propose bug fixes and improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
