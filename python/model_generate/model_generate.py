import os

def clearFile(file_path: str) -> None:
    """
    Erases all lines from the file at the given path.

    :param file_path: The path to the file to be erased.
    """
    
    try:
        with open(file_path, 'w'):  # Open the file in write mode to truncate its contents
            pass  # No need to perform any write operation, as opening in 'w' mode truncates the file

    except FileNotFoundError:
        print("File not found. Please check the file path.")
    except Exception as e:
        print(f"An error occurred: {e}")

def generateArduPilotPlugin(
    systemId: int,
    templateDir: str,
    IP: str = '127.0.0.1') -> str:
    """
    Generates an ArduPilot plugin with the given parameters

    :param systemId: The system ID of the drone
    :param templateDir: The directory where the template files are located
    :param IP: The IP address of the drone
    """

    arduPilotPlugin = templateDir + 'arduPilotPlugin.txt'

    #Calculate the correct ports
    thisIn = 9002 + (systemId - 1)*10
    thisOut = 9003 + (systemId - 1)*10

    #Use the plugin template
    with open(arduPilotPlugin, 'r') as file:
        # Read the contents of the file into a string
        content = file.read()

        content = content.replace("#IP", IP)
        content = content.replace("#IN", str(thisIn))
        content = content.replace("#OUT", str(thisOut))

    return content

def generateRotorPlugin(templateDir: str) -> str:
    """
    Generates a rotor plugin with the given parameters
    
    :param templateDir: The directory where the template files are located
    """

    rotorPlugin = templateDir + 'rotorPlugins.txt'

    with open(rotorPlugin, 'r') as file:
        plugin = file.readlines()

    plugin = ''.join(plugin)

    return plugin

def generateBasicCameraPlugin(
    templateDir: str,
    angle: float = 0.0,
    fov: float = 1.2,
    near: float = 0.1,
    far: float = 1000,
    updateRate: float = 30,
    cameraName: str = "webcam",
    imageTopicName: str = "image_raw",
    infoTopicName: str = "camera_info",
    fameName: str ="camera_link") -> str:
    """
    Generates a basic camera plugin with the given parameters

    :param templateDir: The directory where the template files are located
    :param angle: The angle of the camera
    :param fov: The field of view of the camera
    :param near: The near clipping plane of the camera
    :param far: The far clipping plane of the camera
    :param updateRate: The update rate of the camera
    :param cameraName: The name of the camera
    :param imageTopicName: The name of the image topic
    :param infoTopicName: The name of the info topic
    :param fameName: The name of the frame
    """

    basicCameraPlugin = templateDir + 'basicCameraPlugin.txt'

    #Use the plugin template
    with open(basicCameraPlugin, 'r') as file:
        # Read the contents of the file into a string
        content = file.read()

        content = content.replace("#ANGLE", str(angle))
        content = content.replace("#FOV", str(fov))
        content = content.replace("#NEAR", str(near))
        content = content.replace("#FAR", str(far))
        content = content.replace("#UPDATE", str(updateRate))
        content = content.replace("#CAMERA", cameraName)
        content = content.replace("#IMAGE", imageTopicName)
        content = content.replace("#INFO", infoTopicName)
        content = content.replace("#FRAME", fameName)
    
    return content

def generateSonarPlugin(
    templateDir: str,
    northEastAngle: float = 0,
    northDownAngle: float = 0,
    minRange: float = 0.2,
    maxRange: float = 10,
    updateRate: float = 10,
    topicName: str = "sonar",
    frameName: str = "sonar_link") -> str:
    """
    Generates a sonar plugin with the given parameters

    :param templateDir: The directory where the template files are located
    :param northEastAngle: The angle of the sonar
    :param northDownAngle: The angle of the sonar
    :param minRange: The minimum range of the sonar
    :param maxRange: The maximum range of the sonar
    :param updateRate: The update rate of the sonar
    :param topicName: The name of the topic
    :param frameName: The name of the frame
    """

    sonarPlugin = templateDir + 'sonarPlugin.txt'

    #Use the plugin template
    with open(sonarPlugin, 'r') as file:
        # Read the contents of the file into a string
        content = file.read()

        content = content.replace("#NEANGLE", str(northEastAngle))
        content = content.replace("#NDANGLE", str(northDownAngle))
        content = content.replace("#MINRANGE", str(minRange))
        content = content.replace("#MAXRANGE", str(maxRange))
        content = content.replace("#UPDATE", str(updateRate))
        content = content.replace("#TOPIC", topicName)
        content = content.replace("#FRAME", frameName)
    
    return content

def generateLidarPlugin(
    templateDir: str,
    updateRate: float = 10,
    samples: int = 1024,
    resolution: float = 1,
    minAngle: float = -3.141593,
    maxAngle: float = 3.141593,
    minRange: float = 0.1,
    maxRange: float = 30,
    topicName: str ="scan",) -> str:
    """
    Generates a lidar plugin with the given parameters

    :param templateDir: The directory where the template files are located
    :param updateRate: The update rate of the lidar
    :param samples: The number of samples of the lidar
    :param resolution: The resolution of the lidar
    :param minAngle: The minimum angle of the lidar
    :param maxAngle: The maximum angle of the lidar
    :param minRange: The minimum range of the lidar
    :param maxRange: The maximum range of the lidar
    :param topicName: The name of the topic
    """

    lidarPlugin = templateDir + 'lidarPlugin.txt'

    #Use the plugin template
    with open(lidarPlugin, 'r') as file:
        # Read the contents of the file into a string
        content = file.read()

        content = content.replace("#UPDATE", str(updateRate))
        content = content.replace("#SAMPLES", str(samples))
        content = content.replace("#RESOLUTION", str(resolution))
        content = content.replace("#MINANGLE", str(minAngle))
        content = content.replace("#MAXANGLE", str(maxAngle))
        content = content.replace("#MINRANGE", str(minRange))
        content = content.replace("#MAXRANGE", str(maxRange))
        content = content.replace("#TOPIC", topicName)
    
    return content

def generateIrisInclude(templateDir: str) -> str:
    """
    Generates the iris include

    :param templateDir: The directory where the template files are located
    """
    with open(templateDir + 'iris_with_standoffs', 'r') as file:
        vehicle = file.readlines()

    iris = ''.join(vehicle)

    return iris

def generateIrisDepend(templateDir: str) -> str:
    """
    Generates the iris depend

    :param templateDir: The directory where the template files are located
    """
    with open(templateDir + 'iris_depend', 'r') as file:
        vehicle = file.readlines()

    iris = ''.join(vehicle)

    return iris

def generateVehicleBase(
    vehicle: str,
    templateDir: str) -> str:
    """
    Generates the base of the vehicle

    :param vehicle: The vehicle to be generated
    :param templateDir: The directory where the template files are located
    """
    if vehicle == 'iris':
        return generateIrisInclude(templateDir)
    else:
        return 'Did not specify a valid vehicle'

def generatePlugin(
    plugin: str, 
    systemId: str,
    templateDir: str) -> str:
    """
    Generates a plugin with the given parameters

    :param plugin: The plugin to be generated
    :param systemId: The system ID of the drone
    :param templateDir: The directory where the template files are located
    """

    if plugin == 'arduPilot':
        return generateArduPilotPlugin(systemId,templateDir)
    elif plugin == 'rotor':
        return generateRotorPlugin(templateDir)
    elif plugin == 'camera':
        return generateBasicCameraPlugin(templateDir,imageTopicName="drone" + str(systemId) + "/image_raw",infoTopicName="drone" + str(systemId) + "/camera_info",fameName="drone" + str(systemId) + "/camera_link")
    elif plugin == 'sonar':
        return generateSonarPlugin(templateDir,topicName="drone" + str(systemId) + "/sonar",frameName="drone" + str(systemId) + "/sonar_link")
    elif plugin == 'lidar':
        return generateLidarPlugin(templateDir,topicName="drone" + str(systemId) + "/scan")
    else:
        return 'Did not specify a valid plugin'

def generateDepend(
    depend: str, 
    templateDir: str) -> str:
    """
    Generates a depend with the given parameters

    :param depend: The depend to be generated
    :param templateDir: The directory where the template files are located
    """

    if depend == 'iris_depend':
        return generateIrisDepend(templateDir)
    else:
        return 'Did not specify a valid depend'

def generateConfig(
    systemId: int,
    modelDir: str,
    templateDir: str, 
    depends: str) -> None:
    """
    Generates the model.config file

    :param systemId: The system ID of the drone
    :param modelDir: The directory where the models are located
    :param templateDir: The directory where the template files are located
    :param depends: The dependencies of the model
    """

    #Set some variables we'll need
    configFile = modelDir + 'drone' + str(systemId) + '/' + 'model.config'
    
    #Erase all lines
    clearFile(configFile)

    #The following lines are common to all models
    with open(configFile, 'w') as file:
        file.write('<?xml version="1.0"?>\n\n')
        file.write('<model>\n')
        file.write('  <name>drone' + str(systemId) + '</name>\n')
        file.write('  <version>1.0</version>\n')
        file.write('  <sdf version="1.6">model.sdf</sdf>\n\n')
        file.write('  <author>\n')
        file.write('    <name>SwarmPlanner</name>\n')
        file.write('  </author>\n\n')
        file.write('  <description>\n')
        file.write('    Gazebo Model generated by SwarmPlanner\n')
        file.write('  </description>\n\n')
        file.write('  <depend>\n')

    #If there are dependencies, add them
    if(len(depends) > 0): 
        for depend in depends:
            with open(configFile, 'a') as file:
                file.write(generateDepend(depend,templateDir))

    #The following lines are common to all models
    with open(configFile, 'a') as file:
        file.write('  </depend>\n')
        file.write('</model>\n')

def generateModel(
    systemId: int,
    modelDir: str,
    templateDir: str,
    vehicle: str,
    plugins) -> None:
    """
    Generates the model.sdf file

    :param systemId: The system ID of the drone
    :param modelDir: The directory where the models are located
    :param templateDir: The directory where the template files are located
    :param vehicle: The vehicle to be generated
    :param plugins: The plugins to be generated
    """

    #Set some variables we'll need
    modelFile = modelDir + 'drone' + str(systemId) + '/' + 'model.sdf'
    modelName = '  <model name="drone' + str(systemId) + '">\n'
    vehicle = generateVehicleBase(vehicle,templateDir)
    plugList = []

    if(len(plugins) > 0): 
        #Add the plugins
        for plugin in plugins:
            plugList.append(plugin)

    
    #Erase all lines
    clearFile(modelFile)
    
    #The following lines are common to all models
    with open(modelFile, 'w') as file:
        file.write('<?xml version="1.0"?>\n')
        file.write('<sdf version="1.6">\n')
        file.write(modelName)
        file.write(vehicle)

    #If there are plugins, add them
    if(len(plugins) > 0): 
        for plug in plugList:
            with open(modelFile, 'a') as file:
                file.write(generatePlugin(plug,systemId,templateDir))

    #The following lines are common to all models
    with open(modelFile, 'a') as file:
        file.write('  </model>\n')
        file.write('</sdf>\n')

def generateVehicleModel(
    systemId: int,
    modelDir: str,
    templateDir: str,
    vehicle: str,
    plugins) -> None:
    """
    Generates the model.sdf and model.config files

    :param systemId: The system ID of the drone
    :param modelDir: The directory where the models are located
    :param templateDir: The directory where the template files are located
    :param vehicle: The vehicle to be generated
    :param plugins: The plugins to be generated
    """

    #Set some variables we'll need
    vehicleDir = modelDir + 'drone' + str(systemId) + '/' #Where sdf and config are
    configFile = vehicleDir + 'model.config'
    modelFile = vehicleDir + 'model.sdf'
    depends = []

    if vehicle == 'iris':
        depends.append('iris_depend')

    #Create the directory
    try:
        os.mkdir(vehicleDir)
    except OSError:
        print ("Creation of the directory %s failed" % vehicleDir)
    else:
        print ("Successfully created the directory %s " % vehicleDir)

    #Generate the model.config file
    generateConfig(systemId,modelDir,templateDir,depends)

    #Generate the model.sdf file
    generateModel(systemId,modelDir,templateDir,vehicle,plugins)

# generateModel(1,'./','./templates/','iris',['rotor','arduPilot'])
# generateConfig(1,'./','./templates/',['iris_depend'])

generateVehicleModel(1,'./','./templates/','iris',['sonar','rotor','arduPilot'])