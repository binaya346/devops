pipeline {
    /* 1. Define where to run (any available agent) */
    agent any

    /* 2. Define the workflow stages */
    stages {
        stage('Initialize') {
            steps {
                echo '🚀 Starting the DevOps Pipeline...'
                echo "Build Number: ${env.BUILD_NUMBER}"
            }
        }

        stage('Build') {
            steps {
                echo '🛠 Building the application...'
                // In a real project, this would be: sh './mvnw clean install'
                sh 'echo "Simulating Maven Build..." && sleep 2'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running Unit Tests...'
                sh 'echo "Tests Passed!"'
            }
        }

        stage('Deploy') {
            steps {
                echo '📦 Deploying to Docker Hub...'
                sh 'echo "Image Pushed Successfully"'
            }
        }
    }

    /* 3. Actions to take after the stages finish */
    post {
        always {
            echo '🧹 Cleaning up workspace...'
        }
        success {
            echo '✅ Success: Everything worked!'
        }
        failure {
            echo '❌ Danger: The build failed!'
        }
    }
}