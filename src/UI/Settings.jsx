import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../supabaseClient';

const Settings = () => {
  const { user, userDetails, setUserDetails } = useAuth();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(userDetails?.username || '');

  const uploadProfilePicture = async () => {
    if (!file) return;
    const filePath = `profiles/${user.id}/${file.name}`;
    let { error } = await supabase.storage.from('avatars').upload(filePath, file);
    if (!error) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      await supabase.from('users').update({ avatar_url: data.publicUrl }).eq('id', user.id);
      setUserDetails((prev) => ({ ...prev, avatar_url: data.publicUrl }));
    }
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadProfilePicture}>Upload Avatar</button>
    </div>
  );
};
export default Settings;
