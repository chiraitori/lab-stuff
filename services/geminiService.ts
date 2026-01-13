import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const explainMolecule = async (
  name: string,
  formula: string,
  category: string
): Promise<string> => {
  const client = getClient();
  if (!client) return "Vui lòng cấu hình API Key để xem thông tin chi tiết.";

  const prompt = `
    Bạn là một trợ lý phòng thí nghiệm hóa học ảo thông minh.
    Người dùng đang xem mô hình 3D của hợp chất: **${name}** (Công thức: ${formula}, Nhóm: ${category}).
    
    Hãy cung cấp một bản tóm tắt ngắn gọn (khoảng 80-100 từ) về:
    1. Trạng thái vật lý ở điều kiện thường.
    2. Một ứng dụng thực tế phổ biến nhất.
    3. Một tính chất hóa học đặc trưng (ví dụ: phản ứng cháy, phản ứng cộng...).
    
    Lưu ý: Không dùng định dạng LaTeX (dấu $) cho công thức hóa học. Hãy dùng ký tự chỉ số dưới (ví dụ H₂, CO₂) hoặc viết thường để hiển thị đúng trên web. Dùng ký tự mũi tên → cho phương trình.
    
    Trả lời bằng tiếng Việt, định dạng Markdown đẹp mắt.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Không có thông tin.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lỗi kết nối máy chủ dữ liệu.";
  }
};

export const explainReaction = async (
  originalMoleculeName: string,
  reactantName: string,
  productFormula: string
): Promise<string> => {
  const client = getClient();
  if (!client) return "Cần API Key để phân tích phản ứng.";

  const prompt = `
    Người dùng vừa thực hiện một phản ứng thế 1:1 trong phòng thí nghiệm ảo.
    - Chất ban đầu: ${originalMoleculeName}
    - Tác nhân: ${reactantName}
    - Sản phẩm tạo thành có công thức: ${productFormula} (Một nguyên tử H bị thay thế bởi 1 nguyên tử halogen).

    Hãy đóng vai giáo viên hóa học:
    1. Dự đoán tên gọi của sản phẩm chính (ưu tiên sản phẩm thế vào carbon bậc cao nếu có).
    2. Viết phương trình hóa học dạng chữ hoặc công thức đơn giản (dùng →, không dùng LaTeX $).
    3. Nêu điều kiện phản ứng (ví dụ: ánh sáng).
    
    Lưu ý: Sử dụng ký tự chỉ số dưới Unicode (như Cl₂, HBr) thay vì LaTeX.
    
    Ngắn gọn dưới 100 từ. Tiếng Việt.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Không thể phân tích phản ứng.";
  } catch (error) {
    return "Lỗi phân tích phản ứng.";
  }
};

export const explainIndustrialProcess = async (
  moleculeName: string,
  processType: 'Cracking' | 'Reforming'
): Promise<string> => {
  const client = getClient();
  if (!client) return "Cần API Key để phân tích quá trình.";

  const prompt = `
    Người dùng muốn tìm hiểu về quá trình **${processType}** của hợp chất **${moleculeName}**.
    
    Hãy giải thích dựa trên định nghĩa chuẩn sau:
    - **Cracking:** Là quá trình bẻ gãy liên kết C-C của hydrocarbon mạch dài để tạo thành các hydrocarbon mạch ngắn hơn (thường là Alkane ngắn hơn và Alkene).
    - **Reforming:** Là quá trình tái định hình cấu trúc mạch carbon (từ mạch thẳng thành mạch nhánh, hoặc đóng vòng thơm) mà không làm thay đổi số lượng nguyên tử Carbon (thường kèm tách Hydro).

    Nội dung trả lời:
    1. **Khả năng phản ứng:** ${moleculeName} có thể tham gia quá trình này không? (Lưu ý: Methane/Ethane thường mạch quá ngắn để cracking tạo alkane/alkene chuẩn, hoặc quá ngắn để reforming tạo nhánh/vòng).
    2. **Sản phẩm dự kiến:** Nếu phản ứng được, sản phẩm chính là gì? (Ví dụ: Cracking Butane ra Ethane + Ethene hoặc Methane + Propene).
    3. **Phương trình minh họa:** Viết 1 phương trình tiêu biểu (Dùng →, chỉ số dưới Unicode).
    4. **Điều kiện:** Nhiệt độ, xúc tác.

    Giữ văn phong ngắn gọn, dễ hiểu cho học sinh. Tiếng Việt.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Không thể phân tích quá trình.";
  } catch (error) {
    return "Lỗi phân tích quá trình.";
  }
};