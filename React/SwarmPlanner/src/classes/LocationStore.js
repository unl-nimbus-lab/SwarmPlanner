class LocationStore {
  globalPinLocationX =  1;
  globalPinLocationY = 1;

  setLocation = (X, Y) => {
    this.globalPinLocationX = X;
    this.globalPinLocationY = Y;
  }
}

export default LocationStore

//Used for storing global locations using React Context.
//Currently used for Google Map Pin Locations

