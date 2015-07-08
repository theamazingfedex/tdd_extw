cltags = exports = module.exports = {}

cltags.parse = (args, defaults, replacements) ->
    # Some Setup
    options = {
        command: ""
        query: []
    }

    if typeof replacements isnt "object" or replacements instanceof Array
        replacements = {}

    # Override above with defaults
    if typeof defaults is "object" and not(defaults instanceof Array)
        for key, val of defaults
            options[key] = val

    # Remove script name and path to node from the args
    if args[0].substr(-4) is "node"
        args = args.slice(2)
    else
        args.shift()

    for arg in args
        # Handle long formed Tags
        if arg.substr(0,2) is "--"
            arg = arg.substr(2)
            if arg.indexOf("=") is -1
                options[arg] = true
            else
                arg = arg.split "="
                key = arg.shift()
                value = arg.join "="
                options[key] = value
        # Handle short hand tags
        else if arg.charAt(0) is "-"
            arg = arg.substr(1)
            ts = []
            if arg.indexOf("=") is -1
                ts = arg.split ""
            else
                arg = arg.split "="
                ts = arg.shift().split ""
                value = arg.join "="
                key = ts.pop()
                key = replacements[key] if replacements.hasOwnProperty key
                options[key] = value
            for t in ts
                t = replacements[t] if replacements.hasOwnProperty t
                options[t] = true
        # Handle plaintext tags
        else
            if options.command is ""
                options.command = arg
            else
                options.query.push(arg)

    # Merge plaintext tags for query
    options.query = options.query.join(" ")

    # Convert numeric tags into ints
    for key, val of options
        if /^[0-9]+$/.test val
            options[key] = parseInt val, 10

    return options
