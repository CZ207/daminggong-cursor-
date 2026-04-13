/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Architecture from './pages/Architecture';
import History from './pages/History';
import HanyuanSearch from './pages/HanyuanSearch';
import AIChat from './pages/AIChat';
import CursorEffects from './components/CursorEffects';
import TopNav from './components/TopNav'; // 确保引入了 TopNav

export default function App() {
  return (
    <Router>
      <CursorEffects />
      {/* 全局导航栏放在这里，这样所有页面都有 */}
      <TopNav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/history" element={<History />} />
        <Route path="/hanyuan" element={<HanyuanSearch />} />
        <Route path="/ai" element={<AIChat />} />
      </Routes>
    </Router>
  );
}