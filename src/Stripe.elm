module Stripe exposing (..)

import Native.Stripe
import Task exposing (Task)


type Currency
    = SGD
    | USD


type alias Error =
    { message : String
    }


type alias SourceCard =
    { id : String
    , card :
        { three_d_secure : String
        }
    }


type alias Source3DSecure =
    { id : String
    , clientSecret : String
    , status : Status3DSecure
    , redirect :
        { url : String
        }
    }


type Status3DSecure
    = Chargeable3D
    | Failed3D
    | Pending3D
    | WrongReturnedValue3D


type alias CreateSource3DSecureParams =
    { sourceCard : SourceCard
    , amount : Int
    , currency : Currency
    , returnUrl : String
    }


createSourceCard : Task Error SourceCard
createSourceCard =
    Native.Stripe.createSourceCard ()


createSource3DSecure : CreateSource3DSecureParams -> Task Error Source3DSecure
createSource3DSecure params =
    Native.Stripe.createSource3DSecure params


callbackOnStatusChanged : Source3DSecure -> Task Never Source3DSecure
callbackOnStatusChanged source =
    Native.Stripe.callbackOnStatusChanged source
