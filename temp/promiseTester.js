var testPromise1 = function(test){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(test){
                resolve('Hello');
            }else{
                reject('Owww');
            }
        }, 1000);
    });
};

var testPromise2 = new Promise(function(resolve, reject){
    setTimeout(function() {
        //reject(new Error('Oop'));
        resolve('Hi');
    }, 1000);
});

testPromise2
    .then(
        function(data){
            console.log('1', data); // 1
            return testPromise1(true);
        },
        function(err){
            console.log('2',err); // 2
        }
    )
    .then(
        function(data){
            console.log('3', data); // 3
        },
        function(err){
            console.log('4',err); // 4
        }
    )
    .catch(function(err){
        console.log('5', err); // 5
    });