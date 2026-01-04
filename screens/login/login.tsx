import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from '../../firebase';


const AuthComponent = () => {
  const [user, setUser] = useState(null); // ログイン状態

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // ログインしている場合
        setUser(authUser);
      } else {
        // ログアウトしている場合
        setUser(null);
      }
    });

    // アンマウント時に監視解除
    return () => {
      unsubscribe();
    };
  }, []);

  // ログイン
  const handleSignIn = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, provider);
      // ログイン成功時の処理
      console.log('ログイン成功', result.user);
    } catch (error) {
      // エラーハンドリング
      console.error('ログインエラー', error);
    }
  };

  // ログアウト
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>ログインユーザー: {user.displayName}</p>
          <p>{user.email}</p>
          {/* アイコン */}
            {user.photoURL && <img src={user.photoURL} alt="User Avatar" style={{ width: 50, height: 50, borderRadius: 25 }} />}
          <button onClick={handleSignOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={handleSignIn}>ログイン</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;