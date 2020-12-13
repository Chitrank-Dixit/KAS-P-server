pipeline {
   agent { 
     label 'docker'
     dockerfile true
   }
   environment {
       registry = "https://hub.docker.com/r/chitrankdixit/KAS-P-server"
       dockerImage = "chitrankdixit/KAS-P-server"
   }
   stages {
       stage('Checkout Source') {
        steps {
          git 'https://github.com/Chitrank-Dixit/KAS-P-server.git'
        }
      }
       stage('Build') {
           steps{
            script {
              dockerImage = docker.build registry + ":$BUILD_NUMBER"
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
           steps{
            script {
              docker.withRegistry( "" ) {
                dockerImage.push()
              }
            }
          }
       }
       stage ('Deploy') {
           steps {
            script {
              kubernetesDeploy(configs: "deployment.yaml", kubeconfigId: "myserverconfig")
            }
          }
       }
   }
}
