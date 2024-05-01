import os

def clearFile(file_path: str) -> None:
    """
    Clear the file at the given file path.

    :param file_path: The file path to the file to clear.
    """

    try:
        with open(file_path, 'w'):
            pass
    
    except FileNotFoundError:
        print("File not found. Please check the file path.")
    except Exception as e:
        print(f"An error occurred: {e}")

def generateWorld(
    worldDirectory: str,
    templateDir: str,
    modelDir: str) -> None:
    """
    Generate a world file from the specifications

    :param worldDir: The directory to save the world file.
    :param templateDir: The directory where the templates are located
    """

    # Check if the template directory exists
    if not os.path.exists(templateDir):
        print("The template directory does not exist. Please check the directory path.")
        return
    
    # Check if the world directory exists
    if not os.path.exists(worldDirectory):
        print("The world directory does not exist. Please check the directory path.")
        return
    
    # Check if the model directory exists
    if not os.path.exists(modelDir):
        print("The model directory does not exist. Please check the directory path.")
        return
    
    #Check if the world file exists
    worldFile = os.path.join(worldDirectory, "swarmWorld.world")
    if os.path.exists(worldFile):
        clearFile(worldFile)
    else:
        print("The world file does not exist. Creating a new one.")
        with open(worldFile, 'w'):
            pass

    # Open the world file
    with open(worldFile, "w") as world:
        # Open the template file
        with open(os.path.join(templateDir, "header.txt"), "r") as template:
            # Read the template file
            header = template.read()
            world.write(header)
            print("World file created successfully.")

        #Add the runway body
        with open(os.path.join(templateDir, "runwayBody.txt"), "r") as template:
            runway = template.read()
            world.write(runway)
            print("Runway added successfully.")

        #Add the sun
        with open(os.path.join(templateDir, "sun.txt"), "r") as template:
            sun = template.read()
            world.write(sun)
            print("Sun added successfully.")

        ##Add the agent models
        models = []
        count = 0
        for agent in os.listdir(modelDir):
            world.write('\t<model name ="' + agent + '">\n')
            world.write('\t\t<include>\n')
            world.write('\t\t\t<uri>model://' + agent + '</uri>\n')
            world.write('\t\t</include>\n')
            world.write('\t\t<pose>' + str(count) + ' 0 0 0 0 0</pose>\n')
            world.write('\t</model>\n\n')
            count += 1

        #dd the footer
        with open(os.path.join(templateDir, "footer.txt"), "r") as template:
            footer = template.read()
            world.write(footer)
            print("Footer added successfully.")

        ##Close
        world.close()


#generateWorld("../../uav_simulator/swarm_simulator/simulator_generated_files/vehicle_worlds/", "./templates", "../../uav_simulator/swarm_simulator/simulator_generated_files/generated_models")