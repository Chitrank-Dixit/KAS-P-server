pipeline {
  agent {
      node {
          label 'jenkins-slave'
      }
  }
  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/Chitrank-Dixit/KAS-P-server.git'
      }
    }

    stage('Build') {
      steps {
        script {
          dockerImage = docker.build name + ":$BUILD_NUMBER" + " --no-cache"
        }

      }
    }

    stage('Check') {
      steps {
        script {
          docker.withRegistry( "" ) {
            dockerImage.inside() {
                stage("Prepare") { sh 'npm install' }
                stage("Test") { sh 'npm test' }
            }
          }
        }
      }
    }

    stage('Publish') {
      steps {
        script {
          docker.withRegistry( 'https://registry.hub.docker.com/', 'dockerhub' ) {
            dockerImage.push()
          }
        }

      }
    }

    stage('Deploy') {
      steps {
        script {
          kubernetesDeploy(configs: "deployment.yaml", kubeconfigId: "myserverconfig")
        }

      }
    }

  }
  environment {
    registry = 'https://registry.hub.docker.com/'
    name = 'chitrankdixit/kas-p-server'
    dockerImage = 'chitrankdixit/kas-p-server'
  }
}