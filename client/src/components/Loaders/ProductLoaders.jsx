import React, { useMemo } from "react";


const styles = `
  .pl-card {
      background: #fff;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 240px;
  }

  .pl-skeleton {
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 37%, #f0f0f0 63%);
      background-size: 400% 100%;
      animation: pl-shimmer 1.2s linear infinite;
      will-change: background-position;
  }

@keyframes pl-shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
}

.pl-image {
      width: 100%;
      padding-top: 70%;
      border-radius: 6px;
}

.pl-name {
    width: 100%;
    height: 20px;
    border-radius: 6px;
}

  .pl-line {
      height: 12px;
      border-radius: 6px;
  }

  .pl-line.short { width: 40%; }
  .pl-line.medium { width: 65%; }
  .pl-line.full { width: 100%; }

  .pl-price {
      height: 14px;
      width: 65%;
      border-radius: 6px;
  }

  .pl-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-top: auto;
  }

.pl-btn {
    height: 36px;
    width: 80%;
    border-radius: 6px;
    margin-left: auto;
    margin-right: auto;
}

@media (max-width: 420px) {
    .pl-card { padding: 10px; }
}
`;

const ProductsLoaders = React.memo(({ Count=4 }) => {
    const items = useMemo(() => Array.from({ length: Count }), [Count]);

  return (
    <>
      <style>{styles}</style>

      <div className="w-full grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-4 gap-4" role="status" aria-live="polite">
        {items.map((_, i) => (
          <div className="pl-card" key={i}>
            <div className="pl-skeleton pl-image" aria-hidden="true" />
              <div className="pl-skeleton pl-name" aria-hidden="true" />
            <div style={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: 8 }}>
              <div className="pl-skeleton pl-line medium" aria-hidden="true" />
              <div className="pl-skeleton pl-line medium" aria-hidden="true" />
              <div className="pl-skeleton pl-price" aria-hidden="true" />
            </div>
            <div className="pl-footer">
              <div className="pl-skeleton pl-btn" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export default ProductsLoaders;
