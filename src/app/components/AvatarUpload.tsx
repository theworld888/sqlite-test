'use client'
import convertHeicToImage from "heic-detect-converter";
export default function AvatarUpload({ onSuccess, customTrigger }: { onSuccess: (url: string) => void, customTrigger?: (openFilePicker: () => void) => React.ReactNode }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // ① 获取直传 token
      const res = await fetch('/api/upload/token', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!res.ok) {
        alert('获取上传凭证失败');
        return;
      }

      const { token, url } = await res.json();

      let convertedFile: Blob;
      try {
        // 上传前转换 HEIC
        convertedFile = await convertHeicToImage(file);
      } catch (err) {
        console.log('HEIC 转换失败', err);
        alert('图片格式不支持或转换失败');
        return;
      }

      // ② 直传七牛（不进后端内存）
      const form = new FormData();
      form.append('token', token);
      form.append('file', convertedFile);
      form.append('key', 'avatar/' + url.split('/').pop()!);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://upload-z2.qiniup.com'); // 华南机房，按实际改
      xhr.onload = () => {
        if (xhr.status === 200) {
          onSuccess(url); // 上传成功，返回最终 URL
        } else {
          alert('上传失败');
          console.error('上传失败，状态码:', xhr.status, xhr.responseText);
        }
      };
      xhr.onerror = () => {
        alert('上传请求出错');
        console.error('上传请求错误');
      };
      xhr.send(form);
    } catch (err) {
      console.error('上传流程异常', err);
      alert('上传失败，请稍后重试');
    }
  };


  const handleClick = () => {
    document.getElementById('avatar-input')?.click()
    // confirm('确定上传头像？', () => {
    // })
  }

  return (
    <div className="flex items-center space-x-4">
      <input
        id="avatar-input"
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFile}
        className="hidden"
      />
      {/* 如果传入 customTrigger 就用它，否则用默认按钮 */}
      {customTrigger ? (
        customTrigger(handleClick)
      ) : (
        <button
          onClick={handleClick}
          className="rounded-full bg-pink-500 px-6 py-2 text-sm text-white shadow-md active:bg-pink-600"
        >
          上传头像
        </button>
      )}


      {/* 进度条（B 站味） */}
      {/* {progress > 0 && (
        <div className="w-32 rounded-full bg-gray-200">
          <div
            className="rounded-full bg-pink-500 py-1 text-center text-xs text-white"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )} */}
    </div>
  )
}