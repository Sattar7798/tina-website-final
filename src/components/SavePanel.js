import React, { useState } from 'react';
import './Panel.css';

const SavePanel = ({ userInfo, onChange, onSave }) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!userInfo.name || !userInfo.email) {
      alert('Please fill in your name and email before saving.');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call the save function from parent component
      await onSave();
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving design:', error);
      alert('There was an error saving your design. Please try again.');
    } finally {
      // Hide loading state
      setIsLoading(false);
    }
  };
  
  return (
    <div className="panel-scroll">
      <div className="panel-section">
        <h3 className="section-title">Save Your Design</h3>
        <p className="section-description">
          Save your facade design and receive feedback from our architectural team
        </p>
        
        <div className="save-tabs">
          <button 
            className={`save-tab ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Info
          </button>
          <button 
            className={`save-tab ${activeTab === 'download' ? 'active' : ''}`}
            onClick={() => setActiveTab('download')}
          >
            Download
          </button>
          <button 
            className={`save-tab ${activeTab === 'share' ? 'active' : ''}`}
            onClick={() => setActiveTab('share')}
          >
            Share
          </button>
        </div>
        
        {activeTab === 'contact' && (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={userInfo.name}
                onChange={onChange}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={userInfo.email}
                onChange={onChange}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Additional Notes</label>
              <textarea 
                id="message" 
                name="message" 
                value={userInfo.message}
                onChange={onChange}
                placeholder="Tell us about your project or any specific requirements..."
                rows={4}
              />
            </div>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" required />
                I agree to receive feedback on my design
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`save-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save & Send Design'}
            </button>
            
            {showSuccessMessage && (
              <div className="success-message">
                Your design has been saved successfully!
              </div>
            )}
          </form>
        )}
        
        {activeTab === 'download' && (
          <div className="download-options">
            <h4>Download Options</h4>
            <p>Save your design in various formats for your use</p>
            
            <div className="download-buttons">
              <button className="download-btn">
                <span className="btn-icon">🖼️</span>
                PNG Image
              </button>
              
              <button className="download-btn">
                <span className="btn-icon">📊</span>
                CAD File (.dwg)
              </button>
              
              <button className="download-btn">
                <span className="btn-icon">📁</span>
                3D Model (.obj)
              </button>
              
              <button className="download-btn">
                <span className="btn-icon">📄</span>
                Specifications (PDF)
              </button>
            </div>
            
            <div className="download-note">
              <p>
                <strong>Note:</strong> The 3D model and CAD files allow you to further develop your 
                design in professional software. The spec sheet includes material information and dimensions.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'share' && (
          <div className="share-options">
            <h4>Share Your Design</h4>
            <p>Send your design to colleagues or share on social media</p>
            
            <div className="share-link-container">
              <input 
                type="text" 
                value="https://architecture-site.com/facade/design/12345" 
                readOnly 
              />
              <button className="copy-link-btn">Copy Link</button>
            </div>
            
            <div className="social-share-buttons">
              <button className="social-btn email">
                <span className="social-icon">✉️</span>
                Email
              </button>
              
              <button className="social-btn">
                <span className="social-icon">🔗</span>
                LinkedIn
              </button>
              
              <button className="social-btn">
                <span className="social-icon">📸</span>
                Instagram
              </button>
              
              <button className="social-btn">
                <span className="social-icon">📌</span>
                Pinterest
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="panel-section">
        <div className="design-summary">
          <h4>Design Summary</h4>
          <div className="summary-info">
            <div className="summary-item">
              <span className="summary-label">Style:</span>
              <span className="summary-value">Modern</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Primary Material:</span>
              <span className="summary-value">Concrete</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Window Style:</span>
              <span className="summary-value">Large Panels</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Dimensions:</span>
              <span className="summary-value">12m × 8m × 10m</span>
            </div>
          </div>
        </div>
        
        <div className="design-analytics">
          <h4>Design Analytics</h4>
          <div className="analytics-items">
            <div className="analytics-item">
              <span className="analytics-icon">☀️</span>
              <div className="analytics-info">
                <span className="analytics-label">Solar Optimization</span>
                <div className="analytics-bar">
                  <div className="analytics-fill" style={{width: '75%'}}></div>
                </div>
                <span className="analytics-value">75%</span>
              </div>
            </div>
            
            <div className="analytics-item">
              <span className="analytics-icon">🌿</span>
              <div className="analytics-info">
                <span className="analytics-label">Sustainability Score</span>
                <div className="analytics-bar">
                  <div className="analytics-fill" style={{width: '60%'}}></div>
                </div>
                <span className="analytics-value">60%</span>
              </div>
            </div>
            
            <div className="analytics-item">
              <span className="analytics-icon">💡</span>
              <div className="analytics-info">
                <span className="analytics-label">Energy Efficiency</span>
                <div className="analytics-bar">
                  <div className="analytics-fill" style={{width: '82%'}}></div>
                </div>
                <span className="analytics-value">82%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePanel; 