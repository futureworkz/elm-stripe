// TODO: Change to package name space when published
// var _futureworkz$elm_stripe_checkout$Native_Stripe = function() {
var _user$project$Native_Checkout = function() {
  function configure(config) {
    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        loadStripeScript(function() {
          window.stripeCheckoutHandler = StripeCheckout.configure({
            key: config.key,
            image: config.image,
            locale: 'auto'
          })

          return callback(_elm_lang$core$Native_Scheduler.succeed())
        })
      })
  }

  function openHandler(checkoutOptions) {
    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        if (window.stripeCheckoutHandler) {
          window.stripeCheckoutHandler.open({
            name: checkoutOptions.name,
            description: checkoutOptions.description,
            currency: checkoutOptions.currency.ctor,
            amount: checkoutOptions.amount,
            token: function(token) {
              window.stripeCheckoutToken = token
              return callback(_elm_lang$core$Native_Scheduler.succeed({
                id: token.id,
                email: token.email
              }))
            },
            closed: function(err) {
              if (window.stripeCheckoutToken) {
                window.stripeCheckoutToken = undefined
              } else {
                return callback(_elm_lang$core$Native_Scheduler.fail())
              }
            }
          })
        } else {
          console.log("Stripe Checkout is not configured. Please initialised Stripe with Stripe.Checkout.configure first.")
        }
      })
  }

  function closeHandler() {
    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        if (window.stripeCheckoutHandler) {
          window.stripeCheckoutHandler.close()
          return callback(_elm_lang$core$Native_Scheduler.succeed())
        } else {
          console.log("Stripe Checkout is not configured. Please initialised Stripe with Stripe.Checkout.configure first.")
        }
      })
  }

  function loadStripeScript(onload) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.onload = onload
    script.src = 'https://checkout.stripe.com/checkout.js'
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  return {
    configure: configure,
    openHandler: openHandler,
    closeHandler: closeHandler
  }
}()
