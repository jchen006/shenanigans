import twitter, argparse

CONSUMER_KEY = ''
CONSUMER_SECRET =''
OAUTH_TOKEN = ''
OAUTH_TOKEN_SECRET = ''


auth = twitter.oauth.OAuth(OAUTH_TOKEN, OAUTH_TOKEN_SECRET,
                           CONSUMER_KEY, CONSUMER_SECRET)

twitter_api = twitter.Twitter(auth=auth)


if __name__=='__main__':
    desc = "App to create a map of tweets from Berkeley"
    parser = argparse.ArgumentParser(description=desc)
    parser.add_argument('secrets')
    args = parser.parse_args()

    with open(args.secrets, 'r') as file:
        lines = file.readlines()

    for line in lines[:-1]:
        val = line.split(', ')[1][:-1]
        if line.startswith('Consumer Key'):
            CONSUMER_KEY = val
        elif line.startswith('Consumer Secret'):
            CONSUMER_SECRET = val
        elif line.startswith('Access Token'):
            OAUTH_TOKEN = val
        elif line.startswith('Token Secret'):
            OAUTH_TOKEN_SECRET = val
    
            
