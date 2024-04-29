def generateComposeCommand(data):
    
    composeCommand = ["python3", "./generate_compose.py"]
    
    COPTERS = 0
    HELICOPTERS = 0
    BLIMPS = 0
    PLANES = 0
    ROVERS = 0
    SUBS = 0

    #Do the number of agents
    if int(data["numberOfAgents"]) > 0:
        COPTERS = int(data["numberOfAgents"])
        composeCommand.append(str(COPTERS))

    composeCommand.append(str(HELICOPTERS))
    composeCommand.append(str(BLIMPS))
    composeCommand.append(str(PLANES))
    composeCommand.append(str(ROVERS))
    composeCommand.append(str(SUBS))


    #Set the ROS
    if data["ros"] == "ROS1":
        composeCommand.append("-c")

    #Set the Gazebo
    if data["gazebo"] == "TRUE":
        composeCommand.append("-g")

    print(composeCommand)

    return composeCommand