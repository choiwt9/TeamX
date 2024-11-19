
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from './components/Menubar';
import { Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import MemberManagement from './components/MemberManagement';
import MemberEdit from './components/MemberEdit';
import PostManagement from './components/PostManagement';
import CommentManagement from './components/CommentManagement';
import InquiryManagement from './components/InquiryManagement';
import InquiryAnswer from './components/InquiryAnswer';
import ExhibitionManagement from './components/ExhibitionManagement';
import ReviewManagement from './components/ReviewManagement';

function App() {

  return (
    <BrowserRouter>
      <main>
        <Menubar />
        <Routes>
          <Route path="/admin" element={ <AdminPage/>}>
            <Route index element={<Navigate to="member-management" replace />} />
            <Route path="member-management" element={<MemberManagement />} />
            <Route path="memberEdit/:userNo" element={<MemberEdit />} />
            <Route path="post-management" element={<PostManagement />} />
            <Route path="comment-management" element={<CommentManagement />} />
            <Route path="inquiry-management" element={<InquiryManagement />} />
            <Route path="inquiry/:inquiryNo" element={<InquiryAnswer />} />
            <Route path="exhibition-management" element={<ExhibitionManagement/>} />
            <Route path="review-management" element={<ReviewManagement/>}/>
          </Route>
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
