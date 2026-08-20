import React from 'react';
import person1 from '../assets/images/person1.jpg';
const ProfileHeader = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className=" text-white md:px-25 flex flex-col md:flex-row items-center gap-6" dir="rtl">
      <img 
        src={profile.avatar || person1}
        alt={profile.name}
        className="w-32 h-32 rounded-full object-cover"
      />

      <div className="flex-1 flex flex-col gap-2 text-center md:text-right">
        <h2 className="text-4xl font-bold">{profile.name}</h2>
        <p className="text-gray-300 text-lg">من {profile.residence}</p>
        <p className="font-semibold text-4xl text-white">{profile.primary_skills}</p>
        <p className="text-gray-200 leading-relaxed max-w-xl">
          {profile.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;