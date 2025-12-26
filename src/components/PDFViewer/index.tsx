import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin, ToolbarSlot, ToolbarProps } from '@react-pdf-viewer/default-layout';
import React from 'react';

// 引入樣式
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
    fileUrl: string;
}

// 按鈕樣式 - 更大更容易點擊
const buttonStyle: React.CSSProperties = {
    margin: '0 6px',
};

const PDFViewer = ({ fileUrl }: PDFViewerProps) => {
    // 自定義工具列 - 簡化版，適合年長者使用
    const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
        <Toolbar>
            {(slots: ToolbarSlot) => {
                const {
                    CurrentPageInput,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    ZoomIn,
                    ZoomOut,
                } = slots;
                return (
                    <div className="rpv-toolbar" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px 16px',
                        minHeight: '50px',
                    }}>
                        {/* 左側：翻頁 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={buttonStyle}><GoToPreviousPage /></div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                                <CurrentPageInput /> 
                                <span style={{ margin: '0 8px' }}>/</span>
                                <NumberOfPages />
                            </div>
                            <div style={buttonStyle}><GoToNextPage /></div>
                        </div>
                        
                        {/* 右側：縮放（只有放大縮小按鈕） */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={buttonStyle}><ZoomOut /></div>
                            <div style={buttonStyle}><ZoomIn /></div>
                        </div>
                    </div>
                );
            }}
        </Toolbar>
    );

    // 建立預設佈局插件 - 隱藏側邊欄
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [], // 完全隱藏側邊欄
        renderToolbar,
    });

    return (
        <div className="h-full w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden" style={{ position: 'relative' }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                    defaultScale={SpecialZoomLevel.PageFit}
                    theme={{
                        theme: 'auto',
                    }}
                />
            </Worker>
        </div>
    );
};

export default PDFViewer;
