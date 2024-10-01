def modify_vehicleinfo(starting_file_path, new_lines, final_file_path):
    try:
        # Read the file contents
        with open(starting_file_path, 'r') as file:
            lines = file.readlines()

        # Find the #SIM line and insert new lines
        updated_lines = []
        sim_found = False
        for line in lines:
            updated_lines.append(line)
            if line.startswith('            # SIM'):
                sim_found = True
                updated_lines.extend(new_lines)  # Add the new lines right after #SIM

        if not sim_found:
            print(f"No #SIM line found in {starting_file_path}")

        # Write the modified content back to the file
        with open(final_file_path, 'w') as file:
            file.writelines(updated_lines)

        #print(f"Lines successfully added beneath #SIM in {final_file_path}")
    except Exception as e:
        print(f"Error while modifying the file: {e}")

def generate_new_lines(number_of_drones):
    new_lines = []

    for i in range(1,number_of_drones+1):
        name = f'            "gazebo-drone{i}":'+' { \n'
        targ =  '               "waf_target": "bin/arducopter",\n'
        par1 =  '               "default_params_filename": ["default_params/copter.parm",\n'
        par2 = f'                                          "default_params/gazebo-drone{i}.parm"],\n'
        clos =  '            },\n'

        new_lines.append(name)
        new_lines.append(targ)
        new_lines.append(par1)
        new_lines.append(par2)
        new_lines.append(clos)

    return new_lines
