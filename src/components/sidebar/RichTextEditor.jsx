import { useRef, useEffect, useCallback } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useCertificate } from '../../context/CertificateContext';

const TOOLBAR_BUTTONS = [
  { cmd: 'bold', icon: Bold, label: 'Bold' },
  { cmd: 'italic', icon: Italic, label: 'Italic' },
  { cmd: 'underline', icon: Underline, label: 'Underline' },
];

const RichTextEditor = () => {
  const { certContent, updateCertContent, textFormat, updateTextFormat } = useCertificate();
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== certContent) {
      editorRef.current.innerHTML = certContent;
    }
  }, [certContent]);

  const exec = useCallback((cmd, val = null) => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      updateCertContent(editorRef.current.innerHTML);
    }
  }, [updateCertContent]);

  const handleInput = () => {
    if (editorRef.current) {
      updateCertContent(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const setAlignment = (align) => {
    document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
    updateTextFormat('align', align);
    if (editorRef.current) {
      updateCertContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
        {TOOLBAR_BUTTONS.map(({ cmd, icon: Icon, label }) => (
          <button
            key={cmd}
            title={label}
            onMouseDown={(e) => { e.preventDefault(); exec(cmd); }}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"
          >
            <Icon size={14} />
          </button>
        ))}
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <button
          title="Align Left"
          onMouseDown={(e) => { e.preventDefault(); setAlignment('left'); }}
          className={`p-1.5 rounded transition-colors ${textFormat.align === 'left' ? 'bg-gray-200 text-jod-navy' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <AlignLeft size={14} />
        </button>
        <button
          title="Align Center"
          onMouseDown={(e) => { e.preventDefault(); setAlignment('center'); }}
          className={`p-1.5 rounded transition-colors ${textFormat.align === 'center' ? 'bg-gray-200 text-jod-navy' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <AlignCenter size={14} />
        </button>
        <button
          title="Align Right"
          onMouseDown={(e) => { e.preventDefault(); setAlignment('right'); }}
          className={`p-1.5 rounded transition-colors ${textFormat.align === 'right' ? 'bg-gray-200 text-jod-navy' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <AlignRight size={14} />
        </button>
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <div className="flex items-center gap-1">
          <label className="text-[10px] text-gray-500">LH:</label>
          <select
            value={textFormat.lineHeight}
            onChange={(e) => updateTextFormat('lineHeight', e.target.value)}
            className="text-xs border border-gray-200 rounded px-1 py-0.5 bg-white"
          >
            {['1.2', '1.4', '1.6', '1.8', '2.0'].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <label className="text-[10px] text-gray-500">LS:</label>
          <select
            value={textFormat.letterSpacing}
            onChange={(e) => updateTextFormat('letterSpacing', e.target.value)}
            className="text-xs border border-gray-200 rounded px-1 py-0.5 bg-white"
          >
            {['0', '1', '2', '3', '4'].map(v => (
              <option key={v} value={v}>{v}px</option>
            ))}
          </select>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        className="px-3 py-2.5 min-h-[100px] text-sm outline-none focus:ring-1 focus:ring-jod-blue/30 bg-white"
        style={{
          textAlign: textFormat.align,
          lineHeight: textFormat.lineHeight,
          letterSpacing: textFormat.letterSpacing + 'px',
        }}
        data-placeholder="Enter certificate content..."
      />
    </div>
  );
};

export default RichTextEditor;
