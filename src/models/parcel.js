const parcel = {
    id: {
        type: Number
    },
    placedBy: {
        type: Number
    },
    weight: {
        type: Number
    },
    weightMetric: {
        type: String
    },
    placedOn: {
        type: Date
    },
    sentOn: {
        type: Date
    },
    delieverdOn: {
        type: Date
    },
    status: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    currentLocation: {
        type: String
    },
    cancelled: {
        type: Boolean,
        default: false
    }

}

export default parcel;