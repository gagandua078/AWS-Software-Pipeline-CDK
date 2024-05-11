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
git clone https://github.com/gagandua078/AWS-Software-Pipeline-CDK.git
cd AWS-Software-Pipeline-CDK/app
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

## Clean Up

To avoid incurring unnecessary charges, remember to delete the resources when they are no longer needed:

```bash
npx cdk destroy
```

--

## License

The code within this project is dual-licensed under the GLINCKER LLC proprietary license and the MIT License. This means it is open for reference and educational purposes, allowing for use, modification, and distribution in accordance with the MIT License's terms, while also respecting the proprietary rights and restrictions under the GLINCKER LLC license.

## MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
