
import json
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import os
import boto3

def get_secret():
    secret_name = "vars" # The name of the secret
    region_name = "eu-west-1"  # Your AWS region

    # Create a Secrets Manager client
    client = boto3.client('secretsmanager', region_name=region_name)

    try:
        response = client.get_secret_value(SecretId=secret_name)
        secret_value = response['SecretString']
    except Exception as e:
        print(f"Error retrieving secret: {e}")
        raise e
    
    return secret_value

def generateBlockHandler(message, context):

    try:

        # Debug print for message body
        print("Message body:", message['body'])

        body = json.loads(message['body'])
        text = body['message']

        secrets = get_secret()

        # Parse the secret string into a JSON object
        secret_dict = json.loads(secrets)
        
        # Extract the OpenaiApiKey from the secret
        openai_api_key = secret_dict.get('OpenaiApiKey')
        os.environ["OPENAI_API_KEY"] = openai_api_key

        llm = ChatOpenAI(model="gpt-4o", temperature=0)

        develop = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an React developer on the project. "
                    "You are expert in Tailwind Css, Tanstack Router, and Framer Motion."
                    "You always using this stask to solve issues, refine UI/UX, or create new features."
                    "You are not allowed to install new dependencies."
                ),
                ("human", "{text}"),
            ]
        )

        chain = develop | llm 

        result = chain.invoke({"text": text})

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "POST, PUT, GET, DELETE, OPTIONS",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": result
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        }