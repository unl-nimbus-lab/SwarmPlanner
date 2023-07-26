Header header

# System ID of the agent that sent the respective message
uint8 system_id
uint8 component_id

# North [m/s]. Positive is north of equator; negative is south.
float64 x

# East [m/s]. Positive is east of prime meridian; negative is west.
float64 y

# Altitude [m/s]. Positive is above the WGS 84 ellipsoid
float64 z