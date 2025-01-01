import { useState, useEffect } from "react";
import axios from 'axios'

export default function ViewCardStatus() {
  const [dataa, setData] = useState([]);
  const [gratitude, setGratitude] = useState(false);
  const [pending, setPending] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    async function Checkdata() {
      try {
        let res = await axios.get('http://localhost:3003/showapplication',{withCredentials:true});
        if (res.status === 200) {
          setData(res.data);
          const approvedData = res.data.some((item) => item.status === 'approved');
          const pendingData = res.data.some((item) => item.status === 'pending');
          const rejectedData = res.data.some((item) => item.status === 'rejected');

          if (approvedData) {
            setGratitude(true);
            setPending(false);
            setRejected(false);
          } else if (pendingData) {
            setPending(true);
            setGratitude(false);
            setRejected(false);
          } else if (rejectedData) {
            setRejected(true);
            setGratitude(false);
            setPending(false);
          } else {
            setGratitude(false);
            setPending(false);
            setRejected(false);
          }
        }
      } catch (error) {
        console.log(error, "couldn't get data");
      }
    }
    Checkdata();
  }, []);

  return (
    <>
      {dataa.length > 0 && gratitude && (
        <h1>Congratulations Your Credit Card has been Approved</h1>
      )}
      {dataa.length > 0 && rejected && (
        <h1>Sorry, Your Application got rejected Due to invalid reasons</h1>
      )}
      {dataa.length > 0 && pending && (
        <h1>Your Application is in Pending, will Send you a detailed email very soon</h1>
      )}
    </>
  );
}