module Stripe.Elements exposing (..)

import Native.Elements
import Task exposing (Task)
import Stripe exposing (Currency, Error)


type alias Config =
    { key : String
    , cardElementID : String
    , errorElementID : String
    , cardOptions :
        { hidePostalCode : Bool
        }
    }


mount : Config -> Task Never ()
mount config =
    Native.Elements.mount config
