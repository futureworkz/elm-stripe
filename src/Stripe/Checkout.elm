module Stripe.Checkout exposing (..)

import Native.Checkout
import Task exposing (Task)
import Stripe exposing (Currency)


type alias Token =
    { id : String
    , email : String
    }


type alias Config =
    { key : String
    , image : String
    }


type alias Checkout =
    { name : String
    , description : String
    , currency : Currency
    , amount : Int
    }


configure : Config -> Task Never ()
configure config =
    Native.Checkout.configure config


openPayment : Checkout -> Task () Token
openPayment checkoutOptions =
    Native.Checkout.openHandler checkoutOptions


closePayment : Task Never ()
closePayment =
    Native.Checkout.closeHandler ()
