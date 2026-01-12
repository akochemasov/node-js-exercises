import notifier from 'node-notifier';

export const notification = ({title, message}) => {
    notifier.notify(
        {
            title: title && 'Timer',
            message: message && 'Timer is done!',        
            sound: true,
            wait: true
        },
        ( error, response, metadata ) =>
        {
            console.log( error, response, metadata );
            
        }
    );
}