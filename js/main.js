document.querySelectorAll(".getProductsByDepartment").addEventListener("click", function(){
    TweenMax.fromTo(".department_container",{
        display: 'block'
    },{
        display: 'none'
    })
})
document.querySelector("#close").addEventListener("click", function () {

    TweenMax.to("#cart",{
        display: 'none'
    });
})