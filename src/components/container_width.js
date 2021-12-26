const calculateWith = (customWidth) => {
    let myWidth = customWidth;
    console.log(myWidth);
    if (myWidth>1000){myWidth="70%";}
    else if (myWidth>800){myWidth="80%";}
    else if (myWidth>600){myWidth="90%";}
    else{myWidth="100%";}
    return myWidth;
};

export default calculateWith;
