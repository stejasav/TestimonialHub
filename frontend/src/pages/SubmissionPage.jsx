import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import QuoteSeal from "../components/QuoteSeal";
import { Link } from "react-router-dom";

function SubmissionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    photo: "",
    testimonial: "",
    rating: "5",
  });

  const [photoMode, setPhotoMode] = useState("upload");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image file size should be less than 3MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: reader.result,
      }));
      toast.success("Photo uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setFormData((prev) => ({ ...prev, photo: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/testimonials", {
        ...formData,
        rating: Number(formData.rating),
      });

      toast.success(res.data.message || "Testimonial submitted successfully!");

      setFormData({
        name: "",
        email: "",
        company: "",
        photo: "",
        testimonial: "",
        rating: "5",
      });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Submission failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const charCount = formData.testimonial.length;

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 lg:px-8 py-10 md:py-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — narrative side */}
          <div className="lg:sticky lg:top-100">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink tracking-tight leading-[1.1]">
              Tell us how it really went.
            </h1>
            <p className="text-ink-soft text-[15px] mt-5 max-w-md leading-relaxed">
              Two minutes of your time helps other people trust us the way you
              already do. Every submission is read, and the good ones earn a
              place on our Wall of Love.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link to="/wall" className="btn btn-secondary">
                See what others said
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — form card */}
          <div className="card shadow-elevated p-7 md:p-9">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <InputField
                label="Company / Role"
                name="company"
                placeholder="Product Manager at Acme Corp"
                value={formData.company}
                onChange={handleChange}
                required
              />

              {/* Photo Upload / URL Toggle */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-semibold text-ink-soft tracking-wide">
                    Profile Photo <span className="text-ink-faint font-normal">(Optional)</span>
                  </label>

                  <div className="flex bg-paper p-0.5 rounded-lg text-[11px] font-semibold border border-border">
                    <button
                      type="button"
                      onClick={() => setPhotoMode("upload")}
                      className={`px-3 py-1 rounded-md transition-all ${
                        photoMode === "upload"
                          ? "bg-surface text-brand shadow-sm"
                          : "text-ink-faint hover:text-ink-soft"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoMode("url")}
                      className={`px-3 py-1 rounded-md transition-all ${
                        photoMode === "url"
                          ? "bg-surface text-brand shadow-sm"
                          : "text-ink-faint hover:text-ink-soft"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {photoMode === "upload" ? (
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center bg-paper/60 hover:border-gold/50 transition-all">
                    {formData.photo ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={formData.photo}
                            alt="Preview"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/30"
                          />
                          <div className="text-left">
                            <p className="text-xs font-semibold text-ink">Photo Attached</p>
                            <p className="text-[11px] text-ink-faint">Ready to submit</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={clearPhoto}
                          className="text-xs text-error font-semibold px-3 py-1.5 bg-error-tint rounded-lg border border-error/20 hover:bg-error/10 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center gap-2 py-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-tint text-brand flex items-center justify-center border border-brand/10">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-brand hover:underline">
                          Click to upload profile photo
                        </span>
                        <span className="text-[11px] text-ink-faint">
                          Supports PNG, JPG, WEBP up to 3MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <InputField
                    name="photo"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.photo}
                    onChange={handleChange}
                  />
                )}
              </div>

              {/* Testimonial Text */}
              <div>
                <InputField
                  label="Your Testimonial"
                  name="testimonial"
                  placeholder="Share details about your experience, how the service helped you, or key outcomes..."
                  value={formData.testimonial}
                  onChange={handleChange}
                  isTextArea
                  required
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-[11px] font-medium ${
                    charCount > 450 ? "text-warning font-bold" : "text-ink-faint"
                  }`}>
                    {charCount} / 500 characters
                  </span>
                </div>
              </div>

              {/* Rating */}
              <InputField
                label="Overall Rating"
                name="rating"
                type="select"
                value={formData.rating}
                onChange={handleChange}
                options={[
                  { value: "5", label: "★★★★★ (5/5 Exceptional Experience)" },
                  { value: "4", label: "★★★★☆ (4/5 Great Experience)" },
                  { value: "3", label: "★★★☆☆ (3/5 Average Experience)" },
                  { value: "2", label: "★★☆☆☆ (2/5 Needs Improvement)" },
                  { value: "1", label: "★☆☆☆☆ (1/5 Poor Experience)" },
                ]}
                required
              />

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3.5 mt-4"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin"></div>
                    Analyzing & Saving...
                  </>
                ) : (
                  <>
                    <span>Submit Feedback</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SubmissionPage;