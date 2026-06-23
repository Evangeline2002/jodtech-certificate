import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useCertificate } from '../../context/CertificateContext';

const SignatureUpload = ({ label, type, accept = 'image/png,image/jpeg' }) => {
  const { [type]: image, uploadSignature, removeSignature } = useCertificate();
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => uploadSignature(type, { dataUrl: e.target.result, name: file.name });
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      {image ? (
        <div className="relative bg-gray-50 rounded-lg border border-gray-200 p-3 flex items-center gap-3">
          <img src={image.dataUrl} alt={label} className="h-14 w-auto object-contain rounded" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{image.name}</p>
            <p className="text-[10px] text-gray-400">Uploaded</p>
          </div>
          <button
            onClick={() => removeSignature(type)}
            className="p-1.5 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={14} className="text-red-400" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-jod-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
          }`}
        >
          <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
          <Upload size={18} className="mx-auto mb-1.5 text-gray-400" />
          <p className="text-xs text-gray-500">
            <span className="font-medium text-jod-blue">Click to upload</span> or drag &amp; drop
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG (transparent preferred)</p>
        </div>
      )}
    </div>
  );
};

export default SignatureUpload;
