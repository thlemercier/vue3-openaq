const Placement = {
    'top left': {
        fallback: [
            'top center',
            'top right',
            'right center',
            'bottom right',
            'bottom center',
            'left center',
            'bottom left',
            'full'
        ]
    },
    'top center': {
        fallback: [
            'top right',
            'right center',
            'bottom right',
            'bottom center',
            'bottom left',
            'left center',
            'top left',
            'full'
        ]
    },
    'top right': {
        fallback: [
            'right center',
            'bottom right',
            'bottom center',
            'bottom left',
            'left center',
            'top left',
            'top center',
            'full'
        ]
    }
    ,
    'right center': {
        fallback: [
            'bottom right',
            'bottom center',
            'bottom left',
            'left center',
            'top left',
            'top center',
            'top right',
            'full'
        ]
    }
}