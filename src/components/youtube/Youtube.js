// import React from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
//
// class Youtube extends React.Component {
//   state = {
//     videos: ''
//   }
//
//   componentDidMount() {
//     axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCAuUUnT6oDeKwE6v1NGQxug&maxResults=16&order=viewCount&q=comedy&type=video&videoDuration=medium&videoEmbeddable=true&fields=items%2CpageInfo%2CprevPageToken%2CregionCode&key=AIzaSyAb3g7hxT7yujlkyViY5Knkk6aTTpRGRhQ')
//       .then(res => {
//         console.log(res.data.items);
//         this.setState({videos: res.data.items});
//         console.log(this.state.videos);
//       })
//       .catch(err => this.setState({ error: err.message}));
//   }
//
//   render() {
//     // console.log(this);
//     return (
//       <div className="container">
//         <h1>YOUTUBE VIDEOS</h1>
//         <div className="row">
//           {this.state.videos.map(data =>{
//             return(
//               <div key={data.id}>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }
//
// export default Youtube;
