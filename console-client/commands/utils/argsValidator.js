const validateArgCount = async (args, minCount) => {
    return new Promise(
        (resolve, reject) => {
            console.log(args);
            for(var i=1; i<=minCount; i++){
                if(args[i]==undefined || args[i]==''){
                    return reject({data: {err:`This command takes a minimum of ${minCount} arguments!`}});
                }
            }
            return resolve();
        }
    )
}

module.exports = {validateArgCount}