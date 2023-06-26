import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile} from './../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
export function withRouter(Children){
  return(props)=>{
     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId=29312;
    }
    this.props.getUserProfile(userId);
  }
  render(){
    return (
        <Profile {...this.props} profile={this.props.profile}/>
    );
  }
};
const mapStateToProps = (state)=>({
  profile: state.profilePage.profile
});
export default connect(mapStateToProps, {getUserProfile}) (withRouter(ProfileContainer));
