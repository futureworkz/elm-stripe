// TODO: Change to package name space when published
// var _futureworkz$elm_stripe_checkout$Native_Stripe = function() {
var _user$project$Native_Elements = function() {
  function mount(config) {
    return _elm_lang$core$Native_Scheduler.nativeBinding(
      function(callback) {
        loadStripeScript(function() {
          window.stripe = Stripe(config.key);
          const elements = window.stripe.elements()

          // We don't know when Elm has rendered the view
          // so we poll for it until the view is rendered
          const listen = setInterval(function() {
            const ele = document.getElementById(config.cardElementID)
            if (ele) {
              config.cardOptions['style'] = {
                base: {
                  fontSize: '18px'
                },
                invalid: {
                  color: '#e64a19'
                }
              }
              window.card = elements.create('card', config.cardOptions)
              window.card.mount('#' + config.cardElementID)

              window.card.addEventListener('change', function(event) {
                var displayError = document.getElementById(config.errorElementID)
                if (event.error) {
                  displayError.textContent = event.error.message
                } else {
                  displayError.textContent = ''
                }
              })

              clearInterval(listen)
            }
          }, 200)

          return callback(_elm_lang$core$Native_Scheduler.succeed())
        })
      })
  }

  function loadStripeScript(onload) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.onload = onload
    script.src = 'https://js.stripe.com/v3/'
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  return {
    mount: mount
  }
}()
