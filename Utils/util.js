const cookieParser = (cookieString,target)=>{
    var match = cookieString.match(new RegExp("(^| )" + target + "=([^;]+)"));
    return match ? match[2] : "";
}

module.exports = {
    cookieParser
  };