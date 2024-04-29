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
        number_of_agents: int
    ) -> None:
    """
    Generate a world with the given number of agents.

    :param number_of_agents: The number of agents to generate.
    """
    