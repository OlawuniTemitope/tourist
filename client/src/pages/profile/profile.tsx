import ProfileMain from "../../components/Profile/ProfileMain";
import ProfileSide from "../../components/Profile/ProfileSide";
export default function Profile() {
 
  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

    return (
      <div className="bg-gray-50">
    <div className="grid my-10 gap-16 lg:grid-cols-2 grid-cols-1 mx-36 bg-white">
      <ProfileSide/>
      <ProfileMain/>
    </div>
    </div>
      );
}
