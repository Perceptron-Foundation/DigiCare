import Footer from "./Footer"
const AIAssistant = () => {
    return (
      <div className="max-w-full h-screen p-4 py-10 md:p-6 bg-[#FEFCE8] dark:bg-gray-800 dark:text-white shadow-lg transition-all flex flex-col">
       
  
        <iframe
          src="http://localhost:8501/?embed=true"
          style={{ height: "100%", width: "100%", border: "none" }}
        ></iframe>
        <Footer/>
       
       
      </div>
    );
  };
  
  export default AIAssistant;