pipeline {
  agent any
  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/Chitrank-Dixit/KAS-P-server.git'
      }
    }

    stage('Build') {
      steps {
        script {
          dockerImage = docker.build name + ":$BUILD_NUMBER"
        }

      }
    }

    stage('Test') {
      steps {
        script {
          docker.withRegistry( "" ) {
            dockerImage.inside() {
              sh 'npm test'
            }
          }
        }
      }
    }

    stage('Publish') {
      steps {
        script {
          docker.withRegistry( "" ) {
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
    registry = 'https://hub.docker.com/r/chitrankdixit/kasp-p-server'
    name = 'kasp'
    dockerImage = 'chitrankdixit/kas-p-server'
  }
}