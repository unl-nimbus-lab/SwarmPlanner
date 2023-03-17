swarmplanner {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        app = docker.build("React")
    }

    stage('Push image') {
        docker.withRegistry('https://ghcr.io', 'git-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}