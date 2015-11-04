Osmosis Authority
=================
The authority application for the Osmosis distributed message board system. Used as the centralised location for a cell cluster to handle user authorisation and authentication.

# AWS Orchestration

Included in this repository is an Ansible configuration to automatically orchestrate a load balanced and containerised setup for Osmosis Authority.

`ansible v1.9.4` and `boto v2.38.0` are minimum requirements to run this. You will also need an AWS account with the access and secret keys as well as a key pair before you can get started. These should be added as environment variables on the machine you'll be running Ansible from.

Prerequisites
-------------
Requires the following environment variables set:
* `AWS_ACCESS_KEY_ID` - Your AWS access key ID.
* `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key.
* (Optional) `AWS_KEY_PAIR` - Named identifier of your AWS key pair.
* (Optional) `APPLICATION_ENV` - Used to show some debug information when set to 'dev'

Configuration
-------------
Before you can orchestrate the application, some variables need to be configured, these can be found in the `ansible/roles/aws/vars/main.yml` file.

The options are as follows:
* `aws_region` - The region to create the application in. Currently we support one region only.
* `aws_iam_instance_role` - The IAM instance role for the ECS cluster. This will need to be setup with the correct policies (TODO).
* `host_instance_type` - The instance type of the container host machines. Defaults to t2.micro.
* `host_ami` - The image of the container host machines. Defaults to `ami-f1b46b82`, which is the Amazon ECS optimized AMI for ECS container hosts.
* `host_elb_name` - Identifier for the Elastic Load Balancer that sits on top of the host container cluster.
* `db_instance_type` - The instance type of the database machines. Defaults to db.t2.micro.
* `db_engine` - The database engine to use. Defaults to MySQL.
* `db_master_username` - The username for the master database account.
* `db_master_password` - The password for the master database account. Must be at least 8 characters in length.
* `cache_instance_type` - The instance type of the cache machines. Defaults to cache.t2.micro.
* `cache_node_count` - The amount of nodes in the cache cluster. Defaults to 1.
* `cache_engine` - The cache engine to use for the cache nodes. Defaults to redis.

Orchestration
-------------

To orchestrate the Osmosis Authority app, simply run the following command from the app's root folder in your shell:
`ansible-playbook -i ansible/hosts ansible/orchestrate-aws.yml`
