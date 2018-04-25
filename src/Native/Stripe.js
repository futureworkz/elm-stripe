// TODO: Change to package name space when published
// var _futureworkz$elm_stripe_checkout$Native_Stripe = function() {
var _user$project$Native_Stripe = function() {
  function createSourceCard() {
    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        if (window.stripe == null) {
          return callback(_elm_lang$core$Native_Scheduler.fail({
            message: "Stripe is not configured. Please initialised Stripe with Stripe.Elements.mount first."
          }))
        }

        window.stripe.createSource(window.card)
          .then(function(result) {
            if (result.error) {
              return callback(_elm_lang$core$Native_Scheduler.fail({
                message: result.error.message
              }))
            } else {
              const source = result.source
              return callback(_elm_lang$core$Native_Scheduler.succeed({
                id: source.id
                , card: {
                  three_d_secure: source.card.three_d_secure
                }
              }))
            }
          })
      }
    )
  }

  function createSource3DSecure(params) {
    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        if (window.stripe == null) {
          return callback(_elm_lang$core$Native_Scheduler.fail({
            message: "Stripe is not configured. Please initialised Stripe with Stripe.Elements.mount first."
          }))
        }

        window.stripe.createSource({
          type: 'three_d_secure',
          amount: params.amount,
          currency: params.currency.ctor,
          three_d_secure: {
            card: params.sourceCard.id
          },
          redirect: {
            return_url: params.returnUrl
          }
        })
          .then(function(result) {
            if (result.error) {
              return callback(_elm_lang$core$Native_Scheduler.fail({
                message: result.error.message
              }))
            } else {
              const source = result.source
              return callback(_elm_lang$core$Native_Scheduler.succeed({
                id: source.id,
                clientSecret: source.client_secret,
                status: toStatus3DSecure(source.status),
                redirect: {
                  url: source.redirect.url
                }
              }))
            }
          })
      }
    )
  }

  function callbackOnStatusChanged(source) {
    const currentStatus = source.status

    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        if (window.stripe == null) {
          console.log("Stripe is not configured. Please initialised Stripe with Stripe.Elements.mount first.")
        }

        var intervalID = setInterval(function() {
          window.stripe.retrieveSource({
            id: source.id,
            client_secret: source.clientSecret
          })
            .then(function(result) {
              const newSource = result.source
              const newSourceStatus = toStatus3DSecure(result.source.status)
              if (newSourceStatus.ctor !== currentStatus.ctor) {
                clearInterval(intervalID)
                callback(_elm_lang$core$Native_Scheduler.succeed({
                  id: newSource.id,
                  clientSecret: newSource.client_secret,
                  status: newSourceStatus,
                  redirect: {
                    url: newSource.redirect
                  }
                }))
              }
            })
        }, 1000)
      })
  }

  function toStatus3DSecure(status) {
    switch(status) {
      case "chargeable" :
        return { ctor: "Chargeable3D" }
      case "failed" :
        return { ctor: "Failed3D" }
      case "pending" :
        return { ctor: "Pending3D" }
      default:
        return { ctor: "WrongReturnedValue3D" }
    }
  }

  return {
    createSourceCard: createSourceCard,
    createSource3DSecure: createSource3DSecure,
    callbackOnStatusChanged: callbackOnStatusChanged
  }
}()
