import { useEffect } from 'react';
import { fb } from 'service';

export const App = () => {

  useEffect(() => {
    fb.firestore
      .collection('chatUsers')
      .where('userName', '==', 'Sookie')
      .get()
      .then(res => {
        const user = res.docs[0]?.data();
        console.log(user);
      });
  }, []);

  return <>Hello SOOKIE</>;
};
