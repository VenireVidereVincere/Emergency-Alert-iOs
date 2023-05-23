import AWS, { AWSError } from 'aws-sdk';

// Get temporary credentials from Cognito
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:6b3cb5f5-f333-4307-953e-3d2f477d3a51',
});

// SNS - Locking in API version
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

export const sendSMS = (personalizedMessage: string, phoneNumber: string, mapsLink: string) => {
  const params: AWS.SNS.PublishInput = {
    Message: personalizedMessage + ` My last location is: ${mapsLink}`, // Message content
    PhoneNumber: phoneNumber, // Destination phone number
  };
  console.log(params)
//  sns.publish(params, (err: AWSError, data: AWS.SNS.PublishResponse) => {
//    if (err) {
//      console.log('Error sending SMS:', err);
//    } else {
//      console.log('SMS sent successfully:', data.MessageId);
//    }
//  });
}
