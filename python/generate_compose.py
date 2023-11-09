import sys
#Need some text here explaining what is going on ...

#Some global variables (Fight me)
useGazebo = False
useMavros = False

helpMsg = "HELP!!!"

#Input Checking
try:
    try:
        n = int(sys.argv[1])
        if (n < 1 or n > 20):
            sys.exit("Error: number of drones must be between 1 and 20")
        print("Configuring simulator for " + str(n) + " drones ...")
    except ValueError:
        sys.exit("Error: Please provide a number of drones to simulate [number here]")
except IndexError:
    sys.exit("Error: Please provide a number of drones to simulate [number here]")

#Process the rest of the arguments, if there are any
numberOfArgs = len(sys.argv)

if numberOfArgs > 2:
    for i in range(2,numberOfArgs):
        if (sys.argv[i][0] != "-"): #Dont parse non "-" cli arguments
            sys.exit("Error: Unknown argument provided: " + sys.argv[i])
        else:
            match(sys.argv[i]):
                case "-g":
                    print("Building simulator for Gazebo")
                case "-m":
                    print("Adding in MAVROS")
                case "-h":
                    print(helpMsg)
                case _:
                    print(helpMsg)
                    sys.exit("Error: Unknown argument provided: " + sys.argv[i])

                
        