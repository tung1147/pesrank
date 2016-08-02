angular.module('app')
/**
 * @ngInject
 */
.run(function(popup) {
  var disablePopupVerify = false;
  return;
  auth.$waitForAuth(function(user) {
    //popup verified
    if(!user.isVerified() && !disablePopupVerify && user.roomId ==0 && user.zoneId == 0) {
      popup.confirm("THÔNG BÁO", "Tài khoản của bạn chưa được xác thực. Vui lòng xác thực tài khoản để nhận ngay 4k vàng và chơi thỏa thích")
      .then(function() {
        popup.profile({
          defaultAction: "verify"
        });
      }).catch(function() {
        disablePopupVerify = true;
      });
    }
  })
})
/**
 * @ngInject
 */
.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, popup ) {
    
}   